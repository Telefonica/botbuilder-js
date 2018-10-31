/**
 * @module botframework-config
 */
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { ILuisService, ServiceTypes } from '../schema';
import { ConnectedService } from './connectedService';

/**
 * Defines a LUIS service connection.
 */
export class LuisService extends ConnectedService implements ILuisService {
    /**
     * Luis app ID.
     */
    public appId: string;

    /**
     * Authoring key for using authoring api.
     */
    public authoringKey: string;

    /**
     * Subscription key for using calling model api for predictions.
     */
    public subscriptionKey: string;

    /**
     * Version of the application.
     */
    public version: string ;

    /**
     * Region for luis.
     */
    public region: string ;

    /**
     * Creates a new LuisService instance.
     * @param source (Optional) JSON based service definition.
     * @param type (Optional) type of service being defined.
     */
    constructor(source: ILuisService = {} as ILuisService, serviceType?: ServiceTypes) {
        super(source, serviceType || ServiceTypes.Luis);
    }

    // get endpoint for the luis service
    public getEndpoint(): string {
        let reg  = this.region.toLowerCase(); 
        if (reg === "virginia" || reg === "usgovvirginia") 
        { 
            return `https://virginia.api.cognitive.microsoft.us`; 
        } 
        else if (reg.startsWith("usgov") || reg.startsWith("usdod")) 
        { 
            return `https://${this.region}.api.cognitive.microsoft.us`; 
        } 
 
        return `https://${this.region}.api.cognitive.microsoft.com`;     
    }

    // encrypt keys in service
    public encrypt(secret: string, encryptString: (value: string, secret: string) => string): void {
        if (this.authoringKey && this.authoringKey.length > 0) {
            this.authoringKey = encryptString(this.authoringKey, secret);
        }
        if (this.subscriptionKey && this.subscriptionKey.length > 0) {
            this.subscriptionKey = encryptString(this.subscriptionKey, secret);
        }
    }

    // decrypt keys in service
    public decrypt(secret: string, decryptString: (value: string, secret: string) => string): void {
        if (this.authoringKey && this.authoringKey.length > 0) {
            this.authoringKey = decryptString(this.authoringKey, secret);
        }
        if (this.subscriptionKey && this.subscriptionKey.length > 0) {
            this.subscriptionKey = decryptString(this.subscriptionKey, secret);
        }
    }

}
