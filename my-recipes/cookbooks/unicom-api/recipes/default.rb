package 'nodejs'
package 'mongodb'

cookbook_file "/etc/init.d/unicom-api" do
    owner "root"
    group "root"
    mode  "0755"
    source "unicom-api-init.d"
end

service "unicom-api" do
    supports :start => true, :restart => true
    action :start
end
