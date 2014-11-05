package 'apt'
package 'apache2'

directory "/vagrant" do
    owner "vagrant"
    group "vagrant"
    mode "0666"
    action :create
end

cookbook_file "/etc/apache2/sites-available/appleseed.conf" do
    source "appleseed.conf"
    owner "root"
    group "root"
    mode "0640"
end

execute "a2ensite appleseed.conf" do
    user "root"
end

execute "a2dissite 000-default.conf" do
    user "root"
end

execute "service apache2 reload" do
    user "root"
end

