import { Subject } from 'rxjs';

export class LoadingOrchestrator {
  private static _signaller: Subject<boolean> = new Subject<boolean>();
  public static get signaller(): Subject<boolean> {
    return LoadingOrchestrator._signaller;
  }
}
