import React from 'react'
import "./Form.css"

function Form() {

  return (
    <div>
      <form>
        <div className= "input-container">
        <label htmlFor="">search</label>
        <select type="text">
        <option value="What">Choose an action please</option>
        <option value="findUsers">Find All Users</option>
        <option value="findUser">Find user</option>
        <option value="Deposit">Deposit money</option>
        <option value="Withdraw">Withdraw money</option>
        <option value="Transfer">Transfer money between accounts</option>
        <option value="Filter">Filter</option>
        <option value="Delete">Delete User</option>
        </select>
        </div>
      </form>
    </div>
  )
}

export default Form