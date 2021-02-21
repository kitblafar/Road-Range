<template>
    <div class="custom-select">
        <nav class="navbar">
        <form>
            <li>
            <label for="data-sets1" class="label">Choose Data Set 1:</label>
            <br>
            <select name="data-sets1" id="data-sets1">
                <option value="999">N/A:</option>
                <optgroup label="Electrical">
                    <option value="1">Speed</option>
                    <option value="2">Voltage</option>
                    <option value="3">Current</option>
                    <option value="4">Battery Percentage</option>
                </optgroup>
                <optgroup label="Mechanical">
                    <option value="5">Slip</option>
                    <option value="6">Acceleration</option>
                    <option value="7">Torque</option>
                    <option value="8">Tire Pressure</option>
                </optgroup>
                <optgroup label="Conditions">
                    <option value="9">Moisture</option>
                    <option value="10">Temperature</option>
                </optgroup>
            </select>
            </li>
            <li>
            <label for="data-sets2" class="label">Choose Data Set 2:</label>
            <br>
            <select name="data-sets2" id="data-sets2">
                <option value="999">N/A</option>
                <optgroup label="Electrical">
                    <option value="1">Speed</option>
                    <option value="2">Voltage</option>
                    <option value="3">Current</option>
                    <option value="4">Battery Percentage</option>
                </optgroup>
                <optgroup label="Mechanical">
                    <option value="5">Slip</option>
                    <option value="6">Acceleration</option>
                    <option value="7">Torque</option>
                    <option value="8">Tire Pressure</option>
                </optgroup>
                <optgroup label="Conditions">
                    <option value="9">Moisture</option>
                    <option value="10">Temperature</option>
                </optgroup>
            </select>
            </li>
            <li>
            <label for="data-sets3" class="label">Choose Data Set 3:</label>
            <br>
            <select name="data-sets3" id="data-sets3">
                <option value="999">N/A</option>
                <optgroup label="Electrical">
                    <option value="1">Speed</option>
                    <option value="2">Voltage</option>
                    <option value="3">Current</option>
                    <option value="4">Battery Percentage</option>
                </optgroup>
                <optgroup label="Mechanical">
                    <option value="5">Slip</option>
                    <option value="6">Acceleration</option>
                    <option value="7">Torque</option>
                    <option value="8">Tire Pressure</option>
                </optgroup>
                <optgroup label="Conditions">
                    <option value="9">Moisture</option>
                    <option value="10">Temperature</option>
                </optgroup>
            </select>
            </li>
            <li>
            <label for="data-sets4" class="label">Choose Data Set 4:</label>
            <br>
            <select name="data-sets4" id="data-sets4">
                <option value="999">N/A</option>
                <optgroup label="Electrical">
                    <option value="1">Speed</option>
                    <option value="2">Voltage</option>
                    <option value="3">Current</option>
                    <option value="4">Battery Percentage</option>
                </optgroup>
                <optgroup label="Mechanical">
                    <option value="5">Slip</option>
                    <option value="6">Acceleration</option>
                    <option value="7">Torque</option>
                    <option value="8">Tire Pressure</option>
                </optgroup>
                <optgroup label="Conditions">
                    <option value="9">Moisture</option>
                    <option value="10">Temperature</option>
                </optgroup>
            </select>
            </li>
        </form>
            <li>
        <button class="submit" @click=this.processForm>Submit</button>
            </li>
        </nav>
    </div>
</template>

<script>
    import {bus} from '../main';

    export default {
        name: "CustomSelect",
        mounted() {
        },
        methods: {
            //function to emit the values of a data-sets (1-4) on the event bus
            processForm() {
                let indexArray=[];
                let yaxisArray=[];

                let form1 = document.getElementById("data-sets1");
                let form2 = document.getElementById("data-sets2");
                let form3 = document.getElementById("data-sets3");
                let form4 = document.getElementById("data-sets4");
                //get indexes
                indexArray[0] = form1.options[form1.selectedIndex].value;
                indexArray[1] = form2.options[form2.selectedIndex].value;
                indexArray[2] = form3.options[form3.selectedIndex].value;
                indexArray[3] = form4.options[form4.selectedIndex].value;
                //get names
                yaxisArray[0] = form1.options[form1.selectedIndex].text;
                yaxisArray[1] = form2.options[form2.selectedIndex].text;
                yaxisArray[2] = form3.options[form3.selectedIndex].text;
                yaxisArray[3] = form4.options[form4.selectedIndex].text;
                bus.$emit("Data Set Index ", indexArray);
                bus.$emit("Data Set Names ", yaxisArray);
                bus.$emit("Submitted ", "Submitted");
            }
        }

    }

</script>

<style scoped>
    .navbar {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: rgba(19, 17, 123, 0.5);
    }
    li {
        float: left;
        padding-left: 3%;
        padding-top: 1%;
        padding-bottom:1%;
    }
    .label {
        float: left;
        color: white;
    }

</style>