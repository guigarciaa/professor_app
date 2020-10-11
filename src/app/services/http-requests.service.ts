import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class HttpRequests {
    constructor(private http: HttpClient) { }

    execute<T>(method: HTTPMethod, path: string, params?: Object): Observable<T> {
        let header = { headers: new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" }) };

        switch (method) {
            case HTTPMethod.Get:
                let url: string = encodeURI(this._urlParameters(path, params, false));
                return this.http.get<T>(url);
            case HTTPMethod.Post:
                return this.http.post<T>(path, params, header);
            case HTTPMethod.Patch:
                return this.http.patch<T>(path, params, header);
            case HTTPMethod.Put:
                return this.http.put<T>(path, params, header)
            case HTTPMethod.Delete:
                return this.http.delete<T> (this._urlParameters(path, params, false), header);
            default:
                break;
        }
    }

    private _urlParameters(path: string, params: Object, cache: boolean) {
        let urlParameters: string[] = [];
        let _path: string = path;
        if (!params) {
            params = new Object();
        }

        params['_cache_'] = new Date().getTime();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const element = params[key];
                urlParameters.push(key + '=' + element);
            }
        }
        _path = _path + '?' + urlParameters.join('&');
        return path;
    }
}

export enum HTTPMethod {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Delete = 'delete',
    Patch = 'patch'
}