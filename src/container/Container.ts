import { container } from "tsyringe";

import ODataParser from "../utils/ODataParser";
import { IODataParserProivder } from "../interfaces/common-interfaces/IODataParser";

import BaseData from "../data/BaseData";
import ProductData from "../data/ProductData";
import VendorData from "../data/VendorData";
import CustomerData from "../data/CustomerData";
import OrderData from "../data/OrderData";
import LocationData from "../data/LocationData";
import UserData from "../data/UserData";

import BaseService from "../services/BaseService";
import ProductService from "../services/ProductService";
import VendorService from "../services/VendorService";
import CustomerService from "../services/CutomerService";
import OrderService from "../services/OrderService";
import LocationService from "../services/LocationService";
import UserService from "../services/UserService";

import { IBaseDataProivder } from "../interfaces/data-interfaces/IBaseData";
import { IProductDataProivder } from "../interfaces/data-interfaces/IProductData";
import { IVendorDataProivder } from "../interfaces/data-interfaces/IVendorData";
import { IOrderDataProivder } from "../interfaces/data-interfaces/IOrderData";
import { ICustomerDataProivder } from "../interfaces/data-interfaces/ICustomerData";
import { ILocationDataProivder } from "../interfaces/data-interfaces/ILocationData";
import { IUserDataProivder } from "../interfaces/data-interfaces/IUserData";

import { IBaseServiceProivder } from "../interfaces/service-interfaces/IBaseService";
import { IProductServiceProivder } from "../interfaces/service-interfaces/IProductService";
import { IVendorServiceProivder } from "../interfaces/service-interfaces/IVendorService";
import { IOrderServiceProivder } from "../interfaces/service-interfaces/IOrderService";
import { ICustomerServiceProivder } from "../interfaces/service-interfaces/ICustomerService";
import { ILocationServiceProivder } from "../interfaces/service-interfaces/ILocationService";
import { IUserServiceProivder } from "../interfaces/service-interfaces/IUserService";

/* DAL Registration */
container.register(IODataParserProivder, {
  useClass: ODataParser,
});
container.register(IBaseDataProivder, {
  useClass: BaseData,
});
container.register(IProductDataProivder, {
  useClass: ProductData,
});
container.register(IVendorDataProivder, {
  useClass: VendorData,
});
container.register(IOrderDataProivder, {
  useClass: OrderData,
});
container.register(ICustomerDataProivder, {
  useClass: CustomerData,
});
container.register(ILocationDataProivder, {
  useClass: LocationData,
});
container.register(IUserDataProivder, {
  useClass: UserData,
});
/* End */

/* Service Registration */
container.register(IBaseServiceProivder, {
  useClass: BaseService,
});
container.register(IProductServiceProivder, {
  useClass: ProductService,
});
container.register(IVendorServiceProivder, {
  useClass: VendorService,
});
container.register(IOrderServiceProivder, {
  useClass: OrderService,
});
container.register(ICustomerServiceProivder, {
  useClass: CustomerService,
});
container.register(ILocationServiceProivder, {
  useClass: LocationService,
});
container.register(IUserServiceProivder, {
  useClass: UserService,
});
/* End */

export default container;
