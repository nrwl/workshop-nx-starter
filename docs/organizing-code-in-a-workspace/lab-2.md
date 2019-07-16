# Lab: Create a Lazy Loaded UI Lib

### Scenario

> Time: 20 minutes

The logs app we wrote is a simple component - essentially a simple wrapper for the `<router-outlet>` tag to allow other feature modules imported by the app to dictate the composition of our application.

We'll need a `feature` library that displays the event logs reported by the system. Since apps should just be concerned with configuration and bootstrap, we will want to build this UI in library.

The `@nrwl/angular:library` schematic has options that support creating libs that are configured for routing. Create a new lib for the list of logs that is lazy loaded by the logs app and use the Angular CLI schematic to generate a component to render some temporary log data in that new lib.

The Angular CLI schematic for generating a component:

```console
ng generate component <name>
```

(remember that you can always use the `-h` option flag to list details about the schematic, or use the Angular Console to see all available options!)

## Instructions

1. Use the `@nrwl/angular:library` schematic to create a new lib containing an NgModule named `ClientLogsFeatureModule`. Use the `--routing` and `--lazy` option flags and use the `--parent-module` option set to the **logs** app module file (this will be the full path relative to the workspace dir, `--parent-module=apps/logs/src/app/app.module.ts`). We'll also set the `--directory` option to `client/logs`, and the name of the library to `feature`.

   > Bonus: Use your Source Control tools to see everything that was changed by running this schematic.

1. In the **logs** app module change the path on the route to an empty string. This will load and will trigger this path to load (because of the matching empty path), which will use the lazy loaded module bundle.

```typescript
{
  path: '',
  loadChildren: () => import('@tuskdesk-suite/client/logs/feature')
    .then(
      module => module.ClientLogsFeatureModule
    )
}
```

3. Use the Angular CLI schematic to create a new component named **logs-list** and make use of the `--project` option to target the **client-logs-feature** lib.

1. In the **client-logs-feature** module, add a route with an empty path to the `LogsListComponent`. Include the `pathMatch: 'full'` property on the route object.

###### libs/logs-view/src/lib/logs-view.module.ts

```ts
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LogsListComponent }
    ])
  ],
  declarations: [LogsListComponent]
})
export class LogsViewModule {}
```

> Bonus: Could we lazy-load another feature module from this module?? What would this look like? What all would you have to adjust to make this happen?

5. In the `LogsListComponent`, add a class field for logs and in the `ngOnInit` set that to an array of sample log objects (with a `message` property).

###### libs/logs-view/src/lib/logs-list/logs-list.component.ts

```ts

  ngOnInit() {
    this.logs = [
      { message : "log one" },
      { message : "log two" },
    ]
  }
```

6. In the `logs-list.component.html`, add a `div` with an `ngFor` to render out the logs. Display the `message` in the div.

###### libs/logs-view/src/lib/logs-list/logs-list.component.ts

```html
<div *ngFor="let log of logs">{{log.message}}</div>
```

## Viewing in the Browser

<br/>

<img width="1440" alt="screen shot 2018-04-17 at 12 12 00 am" src="https://user-images.githubusercontent.com/210413/38851708-05c87bb6-41d4-11e8-8f1f-971dbfe566fc.png">

Run the following command(s) in individual terminals:

- `ng serve api`
- `ng serve logs`

Open up the browser to:

- http://localhost:4204 (logs app)

If you already have one(s) running and you need to restart, you can stop the run with `ctrl+c`.

_(Note: sometimes a change to TypeScript interfaces will not get picked up by the watch so you may need to stop/restart these if you feel your code is correct but you are getting an error)_

## Next Lab

Go to Organizing Code in a Workspace Lab #3: [Public APIs for Libs](lab-3.md)
