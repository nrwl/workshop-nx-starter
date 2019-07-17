# Lab: Public APIs for Libs

### Scenario

> Time: 15 minutes

Just because we put code in a lib doesn't mean that we intend for it to be used outside of that lib. Some lib code should be made public and some should remain internal to the lib. The `index.ts` files in the libs provide a place to export code that is intended to be public.

The time has come to replace the temporary logs data with actual data from the backend API.

- Create a new model interface for event logs, and
- Use the Angular CLI to generate a new service to fetch the logs with the Angular **HttpClient**.
- Use the `index.ts` files to export the bits that need to be used outside of the libs.

## Instructions

1. Find the interface for the `EventLog` data model found at `libs/shared/event-log-utils/src/lib/event-log.interface.ts`

###### `libs/shared/event-log-utils/src/lib/event-log.interface.ts`

```ts
export interface EventLog {
  id: number;
  message: string;
  userId: number;
  resourceType: string;
  resourceId: number;
}
```

2. Notice that the `EventLog` is exported by `src/index.ts` file to make it "public".

3. Use the Angular CLI to create a **client-logs-data-access** module, using the appropriate tags.

4. Add the `HttpClientModule` to the `ClientLogsDataAccessModule`.

5. Use the Angular CLI schematic for generating a new service to create a new service named **log** to the **client-logs-data-access** lib. After generating the service, make sure that it is provided in the `ClientLogsDataAccessModule`.

   > `ng g service log --project=client-logs-data-access`

6. Set up the `LogService` logic (`libs/client/logs/feature/src/lib/log.service.ts`):
   > Make sure the import path for `ApiConfig` is set to `@tuskdesk-suite/backend`. Do not use `import { ApiConfig } from '../../backend/src/lib/api-config';`

```typescript
@Injectable()
export class LogService {
  private _rootUrl = '';
  constructor(
    @Optional() private apiConfig: ApiConfig,
    private http: HttpClient
  ) {
    if (apiConfig) {
      this._rootUrl = apiConfig.rootUrl;
    }
  }
  logs(): Observable<EventLog[]> {
    return this.http.get<EventLog[]>(`${this._rootUrl}/api/event-logs`);
  }
}
```

6. The `ApiConfig` type is not public (you should see the tslint error). Make it **public** by adding an export of it to the **data-access** lib `src/index.ts` file.

   > Be prepared to talk about how the barrel files work in a Nx workspace: `angular.json`, `tslint.json`, `tsconfig.json`.

7. Add an export for the `LogService` to the **client-logs-data-access** `src/index.ts` file to make it public.

8. Import the `ClientLogsDataAccessModule` to the `ClientLogsFeatureModule`.

> Do any lint errors show up? Look at `tslint.json` and `nx.json` and be prepared to discuss what you see.

9. Refactor the `LogsListComponent` to inject the `LogService` (use the npm scope short path for the import) and use it to get logs from the `logs` method. You can `subscribe` to that and set the `logs` class field with the data, or you can make use of the `async` pipe.

###### libs/logs-view/src/lib/logs-list/logs-list.component.ts

```ts
import { LogService } from '@tuskdesk-suite/client/logs/data-access';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent implements OnInit {
  logs: EventLog[]; // or use observable...

  constructor(private logService: LogService) {}

  ngOnInit() {}
}
```

---

### Viewing in the Browser

<br/>

<img width="1440" alt="screen shot 2018-04-17 at 12 00 27 am" src="https://user-images.githubusercontent.com/210413/38851293-6dd66dbe-41d2-11e8-8d02-324226819ce7.png">

Run the following command(s) in individual terminals:

- `ng serve api`
- `ng serve logs`

Open up the browser to:

- http://localhost:4204 (logs app)

If you already have one(s) running and you need to restart, you can stop the run with `ctrl+c`.

_(Note: sometimes a change to TypeScript interfaces will not get picked up by the watch so you may need to stop/restart these if you feel your code is correct but you are getting an error)_

## Next Lab

Go to Organizing Code in a Workspace Lab #4: [Run the Build Command and NPM Scripts](lab-4.md)
