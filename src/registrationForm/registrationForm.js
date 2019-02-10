import React,{Component} from 'react';
import  './registrationForm.css';
import axios from 'axios';

class RegistrationApp extends Component{

    state=
    {
        fields:{},
       errors:{}     
    }

   handlerChange=(event)=>{
       let fields={...this.state.fields};
       fields[event.target.name]=event.target.value;
       this.setState({fields:fields});
   }

   submitUserRegistrationForm=(event)=>{
       event.preventDefault();
       if (this.validateForm()) {
            //Sending Post Request To the firebase
            axios.post("https://registrationapp-79c99.firebaseio.com/data.json", {
                ...this.state.fields
            }).then(response => {
            console.log("POST RESPONSE",response)
            }).catch(err => {
            console.log(err);
            })

            let fields = {};
            fields["firstName"] = "";
            fields["lastName"] = "";
            fields["emailid"] = "";
            fields["mobileno"] = "";
            fields["TypeofMember"]="";
            fields["password"] = "";
            this.setState({fields:fields});
            alert("Form submitted");
        }

    }

  validateForm() {

    let fields = {...this.state.fields};
    let errors = {};
    let formIsValid = true;

    //validate firstname if empty
    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "*Please enter your firstName.";
    }

    //validate lastname if empty
    if (!fields["lastName"]) {
        formIsValid = false;
        errors["lastName"] = "*Please enter your lastName.";
      }
  
     //validate firstname
    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }


     //validate lastname
     if (typeof fields["lastName"] !== "undefined") {
        if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["lastName"] = "*Please enter alphabet characters only.";
        }
      }
     
      //validate emailid if empty
    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (!fields["TypeofMember"]) {
      formIsValid = false;
      errors["TypeofMember"] = "*Please Select one.";
    }
     
    //validate emailid
    if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["emailid"] = "*Please enter valid email-ID.";
        }
      }

      //validate emailid
    if (typeof fields["emailid"] !== "undefined" && this.props.data) {
      const duplicate = Object.keys(this.props.data).filter(key => {
        return this.props.data[key]["emailid"] === fields["emailid"]
      })

      if(duplicate.length){
        formIsValid = false;
        errors["emailid"] = "Email Id Already Exist"
      }
    }

      //validate mobileno if empty
      if (!fields["mobileno"]) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter your mobile no.";
      }

      //validate mobileno
      if (typeof fields["mobileno"] !== "undefined") {
        if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["mobileno"] = "*Please enter valid mobile no.";
        }
      }

    //validate password
      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      //validate password
      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.()";
        }
      }
      this.setState({
        errors: errors
      });

      return formIsValid;


    }



    render()
    {
         return(
             <div>
                 <div id="register">
                    <h3>Welcome to Registration Page!</h3>
                   <form method="post" onSubmit={this.submitUserRegistrationForm}>
                     <fieldset>
                         <legend>Registration Form:</legend>

                         <label>First Name :</label>
                         <input type="text"
                                name="firstName"
                                value={this.state.fields.firstName}
                                onChange={this.handlerChange}/>
                                <div className="errorMsg">
                                    {this.state.errors.firstName}
                                </div>

                        <label>Last Name :</label>
                         <input type="text"
                                name="lastName"
                                value={this.state.fields.lastName}
                                onChange={this.handlerChange}/>
                                <div className="errorMsg"> 
                                    {this.state.errors.lastName}
                                </div>

                        <label>Email Id :</label>
                         <input type="text"
                                name="emailid"
                                value={this.state.fields.emailid}
                                onChange={this.handlerChange}/>
                                <div className="errorMsg">
                                    {this.state.errors.emailid}
                                </div>

                        <label>Mobile No:</label>
                         <input type="tel"
                                name="mobileno"
                                pattern="[0-9]{10}"
                                value={this.state.fields.mobileno}
                                onChange={this.handlerChange}
                                />
                                <div className="errorMsg">
                                    {this.state.errors.mobileno}
                                </div>
                
                        <label>Type Of Member:</label>
                        <select name="TypeofMember" onChange={this.handlerChange} 
                            value={this.state.fields.TypeofMember}>
                              <option value="Select">-- Select --</option>
                              <option value="Entrepreneur"> Entrepreneur</option>
                              <option value="Investor"> Investor</option>
                              <option value="Incubator"> Incubator</option>
                        </select>
                        <div className="errorMsg"> 
                                    {this.state.errors.TypeofMember}
                                </div>

                                <label>Password :<div className="passMsg">(Should contain min 8 characters -> 1 - uppercase, 1 - lowercase, 1 - number, 1 - specialChar)</div></label>
                         <input type="password"
                                name="password"
                                value={this.state.fields.password}
                                onChange={this.handlerChange}
                                />
                                <div className="errorMsg" >
                                    {this.state.errors.password}
                                </div>
                                <br></br>

                                <input type="submit"
                                value="Submit" className="button"/>
                                
                     </fieldset>
                 </form>

                 </div>
             </div>


          );

    }

}

export default RegistrationApp;