import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import  './MissionListstyle.css';
class Details{
    constructor(name,describe,id,finish){
        this._name =name;
        this._describe =describe;
        this._id =id;
        this._finish =finish;
        this._sub =[];
        this._count =0;
    }
    get name(){
        return this._name;
    }
    get describe(){
        return this._describe;
    }
   
    get id(){
        return this._id;
    }
    get finish(){
        return this._finish;
    }
    set name(name){
        this._name=name;
    }
    set describe(describe){
        this._describe=describe;
    }
    get sub(){
        return this._sub;
    }
    addmission(item){
        this._sub.push(item);
        this._count++;
    }
    get count(){
        return this._count;
    }

    
}
let COUNT =0;
class MissionList extends React.Component{
    constructor(props) {
        super(props);
        this.newElement = this.newElement.bind(this);
        this.show = this.show.bind(this);
        this.edit = this.edit.bind(this);
        this.state = {list:[],fullname:'',describes:[]};
        this.addSubMission = this.addSubMission.bind(this);
        this.searchMissions = this.searchMissions.bind(this);
    }
     newElement() {
        let name = document.getElementById("missionname").value;
        let fullname = document.getElementById("name").value;
        let describe = document.getElementById("describe").value;
        let ar =[];
        if(name !=="" && describe !==""){
            
            let info = new Details(name,describe,COUNT,false,ar);
            this.setState({ list: [...this.state.list, info] ,describes:[...this.state.describes,describe]});
            this.setState({fullname:fullname});
            console.log(this.state.list.sub);
            document.getElementById("missionname").value="";
            document.getElementById("describe").value = "";
        }else{
            alert('תבדוק שרשמת בשני התיבות');        
        }
        COUNT++;        
    }
    show(e){
        
        try{
            console.log(parseInt(e.target.id));
            document.getElementById("showname").innerHTML = this.state.list[parseInt(e.target.id)].name;
            document.getElementById("showdata").innerHTML = this.state.list[parseInt(e.target.id)].describe;
            document.getElementById("checkbox").style.visibility = "visible";
            document.getElementById("label").style.visibility = "visible";
            this.state.list[parseInt(e.target.id)].finish = document.getElementById("checkbox").checked;
            
        }catch(e){
            console.log(e);
        }
        
    }

    
    deleteMission(e){
        console.log(e.target.id);
        let li = document.getElementById(e.target.id);
        li.parentElement.removeChild(li);
    }
    searchMissions(){
        let lis = document.getElementById('myUL').getElementsByTagName('li');
        for (let i = 0; i < lis.length; i++) {
            console.log(this.state.describes[i]);
            if (lis[i].innerHTML.indexOf(document.getElementById("search").value) !==-1 || this.state.describes[i].indexOf(document.getElementById("search").value) !==-1 ||lis[i].innerHTML.indexOf(document.getElementById("search").value) !==-1 && this.state.describes[i].indexOf(document.getElementById("search").value) !==-1){ 
                lis[i].style.display = 'list-item';
            }else{
                lis[i].style.display = 'none';
            }
        }
    }
    cleanSearch(){
        let lis = document.getElementById('myUL').getElementsByTagName('li');
        for (let i = 0; i < lis.length; i++) {
                lis[i].style.display = 'list-item';
        }
    }
    edit(e){
        alert('רשום את הערכים החדשים בתיבות שרשמת למעלה');
        console.log(e.target.id);
        console.log(e.target.parentElement.id);
        let name = document.getElementById("missionname").value;
        let describe = document.getElementById("describe").value;
        this.state.list[parseInt(e.target.parentElement.id)].name=name;
        this.state.list[parseInt(e.target.parentElement.id)].describe=describe;
        document.getElementById(e.target.parentElement.id).value=name;
        this.setState({list:this.state.list});

    }
     gethour(){
        const date = new Date();
        const hour = date.getHours();
        console.log(hour);
        if(hour<13){
          alert("בוקר טוב");
          console.log('dadada')
        } else if(hour>13 && hour<17){
          alert('צהריים טובים');
        }else{
          alert('ערב טוב');
        }
      }
      componentDidMount() {
        window.addEventListener('load', this.gethour);
        
     }
     addSubMission(e){
        let lis = document.getElementById('listdata').getElementsByTagName('li');
        let submission = document.getElementById('checklist').value;
        this.state.list[parseInt(e.target.id)].addmission(submission);
        let has = false;
        let word ='';
        let k=0;
        for(let i =0;i<lis.length;i++){
            for(let j =0;j<this.state.list[parseInt(e.target.id)].sub.length;j++){
                console.log(lis[i].innerHTML);
                if(lis[i].innerText===this.state.list[parseInt(e.target.id)].sub[j]){
                    has = true;
                }
            }
            if(has===false){
                console.log('check');
                console.log(lis[i].value);
                lis[i].style.display = 'none';
            }
            has=false;
            
        }
        this.setState({list:this.state.list});
     }
     clear(){
        let lis = document.getElementById('listdata').getElementsByTagName('li');
        for (let i = 0; i < lis.length; i++) {
                lis[i].style.display = 'list-item';
        }
     }
     removeSub(e){
         let ul = document.getElementById("c"+e.target.id);
         ul.parentElement.removeChild(ul);
     }
     
    
    
    
    render(){
        return(
            <div>
                <h4>מחובר:{this.state.fullname}</h4>
                <div className="inputfield">
                <TextField id="missionname" label="שם המשימה" color="secondary" style={{background:"white"}}/>
                <Button variant="contained" color="secondary"id ="cleanbtn" onClick={this.cleanSearch}>נקה</Button>
                <Button variant="contained" color="secondary"id ="searchbtn" onClick={this.searchMissions}>חפש</Button>
                <TextField id="search"  label="חיפוש משימה" color="secondary"style={{background:"white"}} />
                </div>
                <br></br>
                <TextField id="describe" 
                label="תיאור" 
                multiline 
                rowsMax={4}
                style ={{marginTop:20}}
                style={{background:"white"}}
                color="secondary" />
                <br></br>
                <TextField id="name" label="שם מלא" style ={{marginTop:20,background:"white"}} />
                <br></br>
                <Button variant="contained" color="secondary" id="save" onClick={this.newElement} style ={{marginTop:40}}>שמור</Button>
                <br></br>
                <div className="container">
                <ul 
                id="myUL" style={{listStyle:'none'}}  
                >
                {this.state.list.map((item,i=0) => (
            <li onClick={this.show} id={i}key={i}>{item.name} <span className="close" id={item.id} onClick={this.deleteMission}>{"\u00D7"}</span><span className="edit" id={"key"+item.id} onClick={this.edit}>{"\u270E"}</span><span className="submission" id={item.id} onClick={this.addSubMission}>{"\u270D"}</span></li> 
            ))}
                </ul>
                <div className="container2">
                <h4 id="showname" style={{color:'red',marginTop:20}}></h4>
                <p id="showdata"></p>
                <div className="checklistmissions">
                <TextField id="checklist"  label="תת משימה" color="secondary"style={{background:"white",marginTop:20}} />
                <Button variant="contained" color="secondary" id="check" onClick={this.clear}>נקה</Button>
                </div>
                    <ul id="listdata">{this.state.list.map((item) =>( item.sub.map((submis,i=0) =>(<li id={i=i+1} onClick={this.deleteMission}>{submis}</li>))))}</ul>
                </div>
                </div>
            </div>
        );
            
    }
};
export default MissionList;
