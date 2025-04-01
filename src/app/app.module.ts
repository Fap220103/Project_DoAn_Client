import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ModulesModule } from './modules/modules.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        ModulesModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-right', 
            timeOut: 3000, 
            closeButton: true, 
            progressBar: true,
            toastClass: 'ngx-toastr custom-toast' 
        }),
        BrowserAnimationsModule], 
    providers: [
        provideHttpClient(withInterceptorsFromDi(), withInterceptors([loadingInterceptor]))
    ]
})
export class AppModule { }
