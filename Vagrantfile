# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.

  config.vm.box = "opscode-13.10"
  config.vm.box_url = "http://opscode-vm-bento.s3.amazonaws.com/vagrant/virtualbox/opscode_ubuntu-13.10_chef-provisionerless.box"

  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.network "private_network", ip: "10.20.20.20"

  config.omnibus.chef_version = :latest

  config.vm.provision "chef_solo" do |chef|
     chef.cookbooks_path = "./my-recipes/cookbooks"
     chef.roles_path = "./my-recipes/roles"
     chef.data_bags_path = "./my-recipes/data_bags"
     chef.add_recipe "unicom-apache"
     chef.add_recipe "unicom-api"
  end
end
