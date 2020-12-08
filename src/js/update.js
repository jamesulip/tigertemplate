
import  store  from '../store/index.js'
export function updateStatus(project){
    store.dispatch('set_current_job').then(x=>{
       
        if(x && x.ID == project.ID){
            // alert('play with current project and prject not equal')
        }
        else if(x && x.ID != project.ID){
            // alert('play with current project and prject equal')
        }
        else if(!x){
            // alert('no active')
        }
    })
}

export function btnIcon(Status, f, pp) {
    if (f == "dis_en") {
        if (pp == "play") {
            if (Status == null && Status != "Working on it" || Status == 'Paused')
                return false;
            else
                return true;

        } else if (pp == "pause") {
            if (Status == "Working on it")
                return false;
            else
                return true;
        } else {
            if (Status == "Working on it")
                return false;

            else
                return true;
        }
    }
}
