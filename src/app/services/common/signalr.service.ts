import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

constructor(@Inject("baseSignalRUrl")private baseSignalRUrl:string){}
private _connection:HubConnection;

get connection():HubConnection{
  return this._connection;
}

start(hubUrl:string){   //Başlatılmış bir hub verecek
  hubUrl=this.baseSignalRUrl+hubUrl;
if(!this.connection || this._connection.state == HubConnectionState.Disconnected){
  const builder:HubConnectionBuilder = new HubConnectionBuilder(); //Js'de hub a karşılık
  const hubConnection: HubConnection = builder
  .withUrl(hubUrl)
  .withAutomaticReconnect()
  .build();

  hubConnection.start() //hub ı başlattık
  .then(()=>{
  console.log("Connected");
  this._connection=hubConnection;})
  .catch(error=> setTimeout(()=>this.start(hubUrl), 2000)); //Bağlantıyı 2 sn de bir sağlayabilmesi için bir tetiklemede bulunucaz. 
}
this._connection.onreconnected(connectionId=>console.log("Reconnected")); //kopan bağlantı tekrar sağlanırsa durum yönetimi burada gerçekleşiyor
this._connection.onreconnecting(error=>console.log("Reconnecting"));  //kopan bağlantının tekrardan bağlanma sürecinde olduğunu ifade ediyor.
this._connection.onclose(error=>console.log("Close reconnection"));  
} 

invoke(procedureName:string, message:any, successCallBack?:(value)=>void, errorCallBack?:(error)=>void){  //SignalR üzerinden herhangi bir client ın diğer clientlara mesaj gönderme ihtiyacı olursa invoke u kullanma durumu, yani event fırlatmak gibi düşünebilirsin. Buradan yazıyorum karşı tarafa mesaj düşüyor. 
this.connection.invoke(procedureName, message)  //backenddeki hub da hangi fonksiyon varsa onu tetikle.
.then(successCallBack)
.catch(errorCallBack);
} 

on(procedureName:string, callBack:(...message:any)=>void){   //Server'dan gelecek olan anlık mesajların hepsini runtime da yakalamamı sağlayacak temel alıcı fonksiyonları tanımlamamı sağlayan bir fonksiyon olacak. Yani client olarak ben tetikleneceksem bana bir mesaj gelecekse hangi event tetiklenecekse onu buradan tetikliyor olucam.
  this.connection.on(procedureName,callBack);
} 


}
