import {Router, RouteRecordRaw} from "vue-router";

export default abstract class BaseModule {
    protected abstract moduleRoute: RouteRecordRaw;

    public getModuleRoute(): RouteRecordRaw {
        return this.moduleRoute;
    }
}
