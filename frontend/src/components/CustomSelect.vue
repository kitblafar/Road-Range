<template>
    <div class="custom-select">
        <form>
            <label for="data-sets1">Choose Data Set 1:</label>
            <br>
            <select name="data-sets1" id="data-sets1">
                <option value="0">Data Set 1:</option>
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
            <label for="data-sets1">Choose Data Set 2:</label>
            <br>
            <select name="data-sets2" id="data-sets2">
                <option value="0">Data Set 1:</option>
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
            <label for="data-sets3">Choose Data Set 3:</label>
            <br>
            <select name="data-sets3" id="data-sets3">
                <option value="0">Data Set 3:</option>
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
            <label for="data-sets4">Choose Data Set 4:</label>
            <br>
            <select name="data-sets4" id="data-sets4">
                <option value="0">Data Set 4:</option>
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
        </form>
        <button class="submit" @click=this.processForm>Submit</button>
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
                let form1 = document.getElementById("data-sets1");
                let value = form1.options[form1.selectedIndex].value;
                console.log(value);
                bus.$emit("Data Set Required", value);
            }
        }

    }

</script>

<style scoped>

</style>