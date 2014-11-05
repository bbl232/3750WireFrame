package 'apt'
package 'apache2'

cookbook_file "/etc/apache/sites-available/appleseed.conf" do
    source "appleseed.conf"
    owner "root"
    group "root"
    mode "0640"
end

