// init.js
// This script runs only on first container startup when the DB is empty.
// It creates databases and users for the different services.

print('*** mongo init script starting');

db = db.getSiblingDB('admin');
// create root/admin user (optional if you prefer only service users)
if (!db.getUser("root")) {
    db.createUser({
    user: 'root',
    pwd: 'rootpassword123',
    roles: [ { role: 'root', db: 'admin' } ]
    });
}

// create core DB and user
coreDB = db.getSiblingDB('taskapp_core');
if (!db.getUser("taskapp_core")) {
    coreDB.createUser({
    user: 'core_user',
    pwd: 'core_pass_please_change',
    roles: [ { role: 'readWrite', db: 'taskapp_core' } ]
    });
}

// create rules DB and user
rulesDB = db.getSiblingDB('taskapp_rules');
if (!db.getUser("taskapp_rules")) {
    rulesDB.createUser({
    user: 'rules_user',
    pwd: 'rules_pass_please_change',
    roles: [ { role: 'readWrite', db: 'taskapp_rules' } ]
    });
}

// create analytics DB and user
analyticsDB = db.getSiblingDB('taskapp_analytics');
if (!db.getUser("taskapp_analytics")) {
    analyticsDB.createUser({
    user: 'analytics_user',
    pwd: 'analytics_pass_please_change',
    roles: [ { role: 'readWrite', db: 'taskapp_analytics' } ]
    });
}

print('*** mongo init script finished');