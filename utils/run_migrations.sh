DATABASE_NAME=${DATABASE_NAME:-stage}
USERNAME=${USERNAME:-root}
PASSWORD=${PASSWORD:-welcome1}
HOST=${HOST:-172.20.240.1}

mysql --host=$HOST --user=$USERNAME --password=$PASSWORD --default-character-set=utf8mb4 -e "DROP DATABASE IF EXISTS $DATABASE_NAME;"

mysql --host=$HOST --user=$USERNAME --password=$PASSWORD --default-character-set=utf8mb4 -e "CREATE DATABASE $DATABASE_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

for file in ../migration/*.sql
do
    mysql --host=$HOST --user=$USERNAME --password=$PASSWORD --default-character-set=utf8mb4 $DATABASE_NAME <<EOF
    SET NAMES utf8mb4;
    SOURCE $file;
EOF
done