# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}


resource "azurerm_resource_group" "cityconnect" {
  name     = "cityconnect-rg"
  location = "Southeast Asia"
}

resource "azurerm_container_registry" "acr" {
  name                = "cityconnect"
  resource_group_name = azurerm_resource_group.cityconnect.name
  location            = azurerm_resource_group.cityconnect.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_postgresql_server" "db" {
  name                             = "notice-db"
  resource_group_name              = azurerm_resource_group.cityconnect.name
  location                         = azurerm_resource_group.cityconnect.location
  version                          = "11"
  administrator_login              = "<YOUR USERNAME>"
  administrator_login_password     = "<YOUR PASSWORD>"
  public_network_access_enabled    = true
  ssl_enforcement_enabled          = false
  sku_name                         = "B_Gen5_1"
  ssl_minimal_tls_version_enforced = "TLSEnforcementDisabled"
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "cityconnect-aks"
  location            = azurerm_resource_group.cityconnect.location
  resource_group_name = azurerm_resource_group.cityconnect.name
  dns_prefix          = "cityconnect-aks"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_DS2_v2"
  }

  service_principal {
    client_id     = "<CLIENT_ID>"
    client_secret = "<CLIENT_SECRET>"
  }

  tags = {
    Environment = "Development"
  }
}
