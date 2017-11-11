import * as fs from "fs";

export interface group {
    id: number,
    name: string,
    members: number[],
    owner: number,
    ispublic: boolean
}

export interface newuser {
    name: string,
    gender: string,
    email: string,
    passwd: string,
    photo: string,
}

export interface user {
    name: string,
    gender: string,
    email: string,
    passwd: string,
    photo: string,
    id: number
}

const DATABASE_SAVE_PATH = "data.json";

export class Database {
    count = 0;
    users = {} as {
        [id: number]: user,
    };
    groups = {} as {
        [id: number]: group
    };

    user_from_email(email: string) {
        for (let uid of Object.keys(this.users)) {
            if (this.users[uid].email.toLowerCase() == email.toLowerCase())
                return this.users[uid];
        }
    }

    add_user(info: newuser) {
        if (this.user_from_email(info.email))
            throw "user with email already exists";
        let user: user = {
            name: info.name,
            gender: info.gender,
            email: info.email,
            passwd: info.passwd,
            photo: info.photo,
            id: this.count++
        };
        this.users[user.id] = user;
        this.save();
        return user;
    }

    new_group(owner: user) {
        let id = this.count++;
        let result = this.groups[id] = <group> {
            id: id,
            name: "",
            owner: owner.id,
            members: [],
            ispublic: true,
        };
        this.save();
        return result;
    }

    groups_for_user(info: user) {
        let groups = [] as group[];
        for (let groupid of Object.keys(this.groups)) {
            let group = this.groups[groupid];
            if (group.members.indexOf(info.id) !== -1) {
                groups.push(group);
            }
        }
        this.save();
        return groups;
    }

    add_user_to_group(id: number, user: user) {
        for (let member of this.groups[id].members) {
            if (member == user.id)
                return;
        }
        this.groups[id].members.push(user.id);
        this.save();
    }

    remove_user_from_group(group_id: number, user_id: number) {
        let my_group = this.groups[group_id].members;
        let i: any;
        for (i in my_group) {
            if (my_group[i] == user_id) {
                this.groups[group_id].members.splice(i, 1);
                this.save();
                return;
            }
        }

    }

    save() {
        let fd = fs.openSync(DATABASE_SAVE_PATH, "w");
        fs.writeSync(fd, JSON.stringify(this));
        fs.closeSync(fd);
    }

    load() {
        try {
            let data = fs.readFileSync(DATABASE_SAVE_PATH).toString();
            let json = JSON.parse(data);
            for (let key of Object.keys(json)) {
                this[key] = json[key];
            }
            global["data"] = json;
        } catch (err) {
            console.log(err.message);
        }
    }
}
