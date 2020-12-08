




export function statusColor(){
  
      
            switch (Status) {
                case 'Working on it':
                    return 'text-aqua info';
                    break;
                case 'Done':
                    return 'text-green success';
                    break;
                case 'Paused':
                    return 'text-orange warning';
                case 'REVISED':
                    return 'text-orange warning';
                    break;
                default:
                    return '';
                    break;
            }
      
  
}