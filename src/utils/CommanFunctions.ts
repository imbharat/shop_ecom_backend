import { SContext } from "../types/SContext";

export class CommanFunctions {
  static addProps<T>(model: T, context: SContext, isAuth: boolean) {
    if (isAuth) {
      return {
        ...model,
        business_id: context.business_id,
      };
    }
    return {
      ...model,
      business_id: context.business_id,
      created_by: context.user_id,
      modified_by: context.user_id,
    };
  }

  static addInsertProps<T>(model: T, context: SContext) {
    return {
      ...model,
      business_id: context.business_id,
      created_by: context.user_id,
      modified_by: context.user_id,
    };
  }
}
