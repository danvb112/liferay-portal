type BillingAddress = {
	city: string;
	country: string;
	countryISOCode: string;
	id: number;
	name: string;
	phoneNumber: string;
	region: string;
	street1: string;
	street2: string;
	zip: string;
};

type Cart = {
	accountId: number;
	billingAddress?: BillingAddress;
	cartItems: CartItem[];
	currencyCode: string;
	paymentMethod: string;
};

type CartItem = {
	price: {
		currency: string;
		discount: number;
		price: number;
		finalPrice: number;
	};
	productId: number;
	quantity: number;
	settings: {
		maxQuantity: number;
	};
	skuId: number;
};

type Channel = {
	currencyCode: string;
	externalReferenceCode: string;
	id: number;
	name: string;
	siteGroupId: number;
	type: string;
};

interface PostCartResponse {
	account: string;
	accountId: number;
	author: string;
	billingAddressId: number;
	createDate: string;
	customFields: object;
	id: number;
	modifiedDate: string;
	orderStatusInfo: {
		cod: number;
		label: string;
		label_i18: string;
	};
	orderTypeId: number;
	orderUUID: string;
	paymentMethod: string;
	paymentStatus: number;
	paymentStatusInfo: {
		cod: number;
		label: string;
		label_i18: string;
	};
	paymentStatusLabel: string;
	purchaseOrderNumber: string;
	status: string;
}

interface PostCheckoutCartResponse extends PostCartResponse {
	cartItems: CartItem[];
}

type SKU = {
	cost: number;
	externalReferenceCode: string;
	id: number;
	price: number;
	sku: string;
	skuOptions: [];
};
