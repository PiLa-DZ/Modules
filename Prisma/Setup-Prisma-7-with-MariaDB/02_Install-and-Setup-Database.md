# Install and Setup MariaDB On Arch-Linux

```Bash
## == ======================================================
# Update & Upgrade
sudo pacman -Syu

## == ======================================================
# Install Mariadb server
sudo pacman -S mariadb
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mariadb-secure-installation

## == ======================================================
# Open Mariadb on terminal
mysql -u root -p

## == ======================================================
# You can also add another user
mysql -u root -p
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
mysql -u admin -p

## == ======================================================
# Create a safe user
CREATE USER 'developer_1'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE ON facebook_db.* TO 'developer_1'@'localhost';
# Now this user CANNOT drop the database!

```
