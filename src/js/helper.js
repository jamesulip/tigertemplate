




export function statusColor(){
  
      
            switch (Status) {
                case 'Working on it':
                    return 'text-aqua info';
                case 'Done':
                    return 'text-green success';
                case 'Paused':
                    return 'text-orange warning';
                case 'REVISED':
                    return 'text-orange warning';
                default:
                    return '';
            }
      
  
}