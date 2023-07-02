import { container } from "tsyringe";
import BaseData from "../data/BaseData";
import ProductData from "../data/ProductData";
import VendorData from "../data/VendorData";
import { IODataParserProivder } from "../interfaces/common-interfaces/IODataParser";
import { IBaseDataProivder } from "../interfaces/data-interfaces/IBaseData";
import { IProductDataProivder } from "../interfaces/data-interfaces/IProductData";
import { IVendorDataProivder } from "../interfaces/data-interfaces/IVendorData";
import { IBaseServiceProivder } from "../interfaces/service-interfaces/IBaseService";
import { IProductServiceProivder } from "../interfaces/service-interfaces/IProductService";
import { IVendorServiceProivder } from "../interfaces/service-interfaces/IVendorService";
import BaseService from "../services/BaseService";
import ProductService from "../services/ProductService";
import VendorService from "../services/VendorService";
import ODataParser from "../utils/ODataParser";

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

container.register(IBaseServiceProivder, {
  useClass: BaseService,
});

container.register(IProductServiceProivder, {
  useClass: ProductService,
});

container.register(IVendorServiceProivder, {
  useClass: VendorService,
});

export default container;
