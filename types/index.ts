export interface ImageProps {
    cloudId?: string;
    url?: string;
    _id?: string;
}

export interface IUser {
    fullName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    workShop?: string;
    workShopAddress?: string;
    workShopPhoto?: ImageProps[];
    servicesId?: string[];
    state?: string;
    address?: string;
    carName?: string;
    carModel?: string;
    userAccountsId?: string[];
    picture?: string;
    _id?: string;
}