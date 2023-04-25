export abstract class SessionInteractor {
    /**
     * 
     * @param key 
     */
    abstract get(key: string): any;
    /**
     * 
     * @param key 
     * @param value
     */
    abstract set(key: string, value: any): void;
    /**
     */
    abstract destroyAll(): void;
    /**
     * 
     * @param key 
     */
    abstract destroy(key: string): void;
}