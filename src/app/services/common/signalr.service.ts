import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string) { }

  start(hubUrl: string) { //Başlatılmış bir hub verecek
    hubUrl = this.baseSignalRUrl + hubUrl;

    const builder: HubConnectionBuilder = new HubConnectionBuilder();

    const hubConnection: HubConnection = builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    hubConnection.start()
      .then(() => console.log("Connected"))
      .catch(error => setTimeout(() => this.start(hubUrl), 2000));  //Bağlantıyı 2 sn de bir sağlayabilmesi için bir tetiklemede bulunucaz. 

    hubConnection.onreconnected(connectionId => console.log("Reconnected"));  //kopan bağlantı tekrar sağlanırsa durum yönetimi burada gerçekleşiyor
    hubConnection.onreconnecting(error => console.log("Reconnecting"));  //kopan bağlantının tekrardan bağlanma sürecinde olduğunu ifade ediyor.
    hubConnection.onclose(error => console.log("Close reconnection"));
    return hubConnection;
  }

  invoke(hubUrl: string, procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {  //SignalR üzerinden herhangi bir client ın diğer clientlara mesaj gönderme ihtiyacı olursa invoke u kullanma durumu, yani event fırlatmak gibi düşünebilirsin. Buradan yazıyorum karşı tarafa mesaj düşüyor. 
    this.start(hubUrl).invoke(procedureName, message)  //backenddeki hub da hangi fonksiyon varsa onu tetikle.
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(hubUrl: string, procedureName: string, callBack: (...message: any) => void) {  //Server'dan gelecek olan anlık mesajların hepsini runtime da yakalamamı sağlayacak temel alıcı fonksiyonları tanımlamamı sağlayan bir fonksiyon olacak. Yani client olarak ben tetikleneceksem bana bir mesaj gelecekse hangi event tetiklenecekse onu buradan tetikliyor olucam.
    this.start(hubUrl).on(procedureName, callBack);
  }
}