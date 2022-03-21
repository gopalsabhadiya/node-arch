import {db} from '../../config/Config';

export default {
    "development": {
        "username": db.user,
        "password": db.password,
        "database": db.name,
        "host": db.host,
        "dialect": "mysql"
    },
    "test": {
        "username": db.user,
        "password": db.password,
        "database": db.name,
        "host": db.host,
        "dialect": "mysql"
    },
    "production": {
        "username": db.user,
        "password": db.password,
        "database": db.name,
        "host": db.host,
        "dialect": "mysql"
    }
}
