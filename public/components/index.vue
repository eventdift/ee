<template>
<div>
        <form-wizard @on-complete="onComplete"
                     color="gray"
                     error-color="#a94442"
                     >
            <tab-content title="Customer details"
                         icon="ti-user" :before-change="validateFirstTab">
               <vue-form-generator :model="model" 
                                   :schema="firstTabSchema"
                                   :options="formOptions"
                                   ref="firstTabForm"
                                   >
                                     
               </vue-form-generator>
            </tab-content>
            <tab-content title="Payment details"
                         icon="ti-money" :before-change="validateSecondTab">
             <vue-form-generator :model="model" 
                                   :schema="secondTabSchema"
                                   :options="formOptions"
                                   ref="secondTabForm"
                                   >                                
               </vue-form-generator>
               
            </tab-content>
            <tab-content title="Last step"
                         icon="ti-check">
              <h2>Transaction details</h2>
              <h5>Please load the following pin digits into your meter</h5>
              <h4><em>2887874398772<em></h4>
              <div class="panel-body">
                <pre v-if="model" v-html="prettyJSON(model)"></pre>
              </div>
            </tab-content>
        </form-wizard>
 </div>
</template>

<script>
import VueFormWizard from 'vue-form-wizard'
import VueFormGenerator from 'vue-form-generator'

export default{
   data(){
    return {
   model:{
    firstName:'',
    lastName:'',
    email:'',
    streetName:'',
    streetNumber:'',
    city:'',
    country:''
   },
   formOptions: {
    validationErrorClass: "has-error",
    validationSuccessClass: "has-success",
    validateAfterChanged: true
   },
   firstTabSchema:{
     fields:[{
        type: "input",
        inputType: "text",
        label: "Meter Numer",
        model: "meterNo",
        required:true,
        validator:VueFormGenerator.validators.string,
        styleClasses:'col-xs-12'
     },
     {
        type: "input",
        inputType: "text",
        label: "Phone Number",
        model: "phoneNo",
        required:true,
        validator:VueFormGenerator.validators.string,
        styleClasses:'col-xs-12'
     },
      {
        type: "input",
        inputType: "text",
        label: "Email",
        model: "email",
        required:true,
        validator:VueFormGenerator.validators.email,
        styleClasses:'col-xs-12'
     }
     ]
   },
   secondTabSchema:{
     fields:[
     {
        type: "input",
        inputType: "text",
        label: "Bank Account Number",
        model: "acct",
        required:true,
        validator:VueFormGenerator.validators.string,
        styleClasses:'col-xs-9'
     },
      {
        type: "input",
        inputType: "text",
        label: "expiry date",
        model: "expires",
        required:true,
        validator:VueFormGenerator.validators.string,
        styleClasses:'col-xs-3'
      },
      {
        type: "input",
        inputType: "password",
        label: "Pin",
        model: "pin",
        required:true,
        validator:VueFormGenerator.validators.string,
        styleClasses:'col-xs-6'
      },
      {
        type: "input",
        label: "Energy units at #20 per unit",
        model: "units",
        required:true,
        validator:VueFormGenerator.validators.string,
        styleClasses:'col-xs-6'
      },
     ]
   }
  }
 },
 methods: {
  onComplete: function(){
      alert('Yay. Done!');
   },
   validateFirstTab: function(){
     return this.$refs.firstTabForm.validate();
   },
   validateSecondTab: function(){
     return this.$refs.secondTabForm.validate();
   },
   
   prettyJSON: function(json) {
            if (json) {
                json = JSON.stringify(json, undefined, 4);
                json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }
        }
  }
}
</script>
<style>
  pre {
    overflow: auto;
  }
  pre .string { color: #885800; }
  pre .number { color: blue; }
  pre .boolean { color: magenta; }
  pre .null { color: red; }
  pre .key { color: green; } 
</style>