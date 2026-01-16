export class ProfileDetails {

    name: string;
    phone: string;
    address: string;
    email: string;

    constructor(
        name: string = "Name",
        phone: string = "Phone",
        address: string = "Address",
        email: string = "Email"
    ) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
    }

}
