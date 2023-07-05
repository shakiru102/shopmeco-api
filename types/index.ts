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
    state?: string;
    address?: string;
    carName?: string;
    carModel?: string;
    picture?: string;
    _id?: string;
    business?: BuisnessAccountsProps
}

export interface BuisnessAccountsProps {
    workShop?: string;
    workShopAddress?: string;
    workShopPhotos?: ImageProps[];
    userId?: string;
    _id?: string;
    businessTime?: {
        from?: { day?: string; time?: string };
        to?: { day?: string; time?: string };
    };
    isAccountActive?: boolean;
    description?: string;
    caption?: string;
    workShopLogo?: ImageProps
}

export interface ReviewProps {
    reviewerId?: string;
    createdAt?: Date;
    rating?: number;
    review?: string;
    
}

export interface BusinessServicesProps {
    userId?: string;
    businessId?: string;
    _id?: string;
    isActive?: boolean;
    displayPhoto?: ImageProps;
    price?: number;
    title?: string;
    description?: string;
    reviews?: ReviewProps[];
    serviceId?: string;
    categoryId?: string;
}

export interface IActivitiesProps {

}

export interface AdminProps {
    staffId?: string;
    password?: string;
    name?: string;
    activities?: IActivitiesProps[];
    _id?: string;
}

export interface IServicesProps {
    caption?: string;
    name?: string;
    _id?: string;
}

export interface ICategoryProps {
    serviceId?: string;
    caption?: string;
    name?: string;
    _id?: string;
}

export interface NotificationsProps {
    title?: string;
    message?: string;
    _id?: string;
    notificationType?: 'message' | 'error' | 'success';
    eventId?: string;
    eventType?: 'message' | 'booking' | 'activity'
    receiverId?: string;
}
