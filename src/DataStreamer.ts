export interface Order {
  price: number,
  size: number,
}
export interface ServerRespond {
  stock: string,
  top_bid: Order,
  top_ask: Order,
  timestamp: Date,
}

class DataStreamer {
  static API_URL: string = 'http://localhost:8080/query?id=1';

  static getData(callback: (data: ServerRespond[]) => void): void {
    const request = new XMLHttpRequest();
    request.open('GET', DataStreamer.API_URL, true);

    request.onload = () => {
      if (request.status === 200) {
        callback(JSON.parse(request.responseText));
      } else {
        // Throw an error or invoke an error callback
        //allows DataStreamer.getData to handle error in 
        //more efficient way
        console.error('Request failed:', request.status);
      }
    }

    request.send();
  }
}

export default DataStreamer;