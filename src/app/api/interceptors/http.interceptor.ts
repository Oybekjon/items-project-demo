import { HttpInterceptorFn } from '@angular/common/http';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authToken = req.headers.get('Authorization');
  if (!(authToken && authToken.startsWith('Bearer ')))
  {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('CURRENT_TOKEN')}`,
      }
    })
  }

  return next(req);
};
