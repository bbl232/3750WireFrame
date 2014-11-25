#!/usr/bin/env bash
set -e
# echo "GET TESTS"
# curl -i -X GET 127.0.0.1:3000/users ;echo -e "\n"
# curl -i -X GET 127.0.0.1:3000/user/1 ;echo -e "\n"
# curl -i -X GET 127.0.0.1:3000/user/1/locations ;echo -e "\n"
# curl -i -X GET 127.0.0.1:3000/user/1/locations/1 ;echo -e "\n"

echo "POST TESTS"
#curl -i -X POST --data '{"user":{"firstname":"John","lastname":"Doe","email":"john@example.com","roles":["staff"],"passwordHash":"fdc51a338cbd6ecd0cb252ffaef615401e4f5424fda4420769542f1aeaea5dec"}}' 127.0.0.1:3000/users ;echo -e "\n"
curl -i -X POST --data '{"location":{"description": "Ochard 2","address1": "4 Real Rd","address2": "","city": "Guelph","postal": "N1G O0O","country": "Canada","latitude": "43.530766","longitude":"-80.229016"}}' 127.0.0.1:3000/user/2/locations ;echo -e "\n"
# curl -i -X POST 127.0.0.1:3000/users/current/authenticate ;echo -e "\n"
# curl -i -X POST 127.0.0.1:3000/users/current/changePassword ;echo -e "\n"
# curl -i -X POST 127.0.0.1:3000/users/current/logout ;echo -e "\n"
#
# echo "PUT TESTS"
# curl -i -X PUT 127.0.0.1:3000/user/1 ;echo -e "\n"
# curl -i -X PUT 127.0.0.1:3000/user/1/locations/1 ;echo -e "\n"
#
# echo "DELETE TESTS"
# curl -i -X DELETE 127.0.0.1:3000/user/1 ;echo -e "\n"
# curl -i -X DELETE 127.0.0.1:3000/user/1/locations/1 ;echo -e "\n"
