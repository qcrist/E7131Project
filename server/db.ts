export interface group {
    id: number,
    name: string,
    members: user[],
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

export class Database {
    group_count = 0;
    user_count = 0;
    users = {} as {
        [email: string]: user,
        [id: number]: user,
    };
    groups = {} as {
        [id: number]: group
    };

    constructor() {
        this.group_count = 0;
        this.user_count = 0;
    }

    add_user(info: newuser) {
        if (this.users[info.email]) {
            throw "user with email already exists";
        }
        let user: user = {
            name: info.name,
            gender: info.gender,
            email: info.email,
            passwd: info.passwd,
            photo: info.photo,
            id: this.user_count++
        };
        this.users[user.id] = user;
        this.users[user.email] = user;
        return user;
    }

    new_group(owner: user) {
        let id = this.group_count++;
        return this.groups[id] = <group> {
            id: id,
            name: "",
            owner: owner.id,
            members: [],
            ispublic: true,
        };
    }

    groups_for_user(info: user) {
        let groups = [] as group[];
        for (let groupid of Object.keys(this.groups)) {
            let group = this.groups[groupid];
            if (group.members.indexOf(info) !== -1) {
                groups.push(group);
            }
        }
        return groups;
    }

    add_user_to_group(id: number, user: user) {
        for (let member of this.groups[id].members) {
            if (member.id == user.id)
                return;
        }
        this.groups[id].members.push(user);
    }
}
