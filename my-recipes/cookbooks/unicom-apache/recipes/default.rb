package 'apt'
package 'apache2'
package 'php5'
package 'libapache2-mod-php5'

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
    notifies :reload, "service[apache2]"
end

execute "a2dissite 000-default.conf" do
    user "root"
    notifies :reload, "service[apache2]"
end

service "apache2" do
    supports :restart => true, :reload => true
    action :nothing
end
