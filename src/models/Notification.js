export default class MsNotification {
  /** @member {string} type */
  type;
  /** @member {string} message */
  message;
  
  
  constructor(message, type = 'info') {
    this.type = type;
    this.message = message;
  }
}