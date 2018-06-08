import React , {Component} from "react";

export default class ShowTable extends Component
{
	constructor(props)
	{
		super(props);
		this.makeStudentList = this.makeStudentList.bind(this);
		this.deleteStudent = this.deleteStudent.bind(this);
		this.editStudent = this.editStudent.bind(this);
	}

	deleteStudent(event)
	{
		this.props.deleteFunc(JSON.parse(event.currentTarget.getAttribute("data-student")));
	}

	editStudent(event)
	{
		this.props.editFunc(JSON.parse(event.currentTarget.getAttribute("data-student")))
	}

	makeStudentList()
	{
		let tableRows = [];
		this.props.students.forEach(student =>{
			tableRows.push(
				<tr key = {student.id}>
					<td>{student.id}</td>
					<td style = {{textAlign : "center"}}>{student.name}</td>
					<td style = {{textAlign : "center"}}>{"m" === student.gender ? "男" : "女"}</td>
					<td style = {{textAlign : "center"}}>{student.age}</td>
					<td style = {{textAlign : "center"}}>
						<button className = "btn btn-success btn-xs" data-student = {JSON.stringify(student)} style = {{marginRight : "20px"}} onClick = {this.editStudent}><i className = "fa fa-edit"></i></button>
						<button className = "btn btn-danger btn-xs" data-student = {JSON.stringify(student)} onClick = {this.deleteStudent} ><i className = "fa fa-times"></i></button>
					</td>
				</tr>
			)
		});
		return tableRows;
	}

	render()
	{
		return(
			<table className = "table table-hover">
				<thead>
					<tr>
						<th>学号</th>
						<th style = {{textAlign : "center"}}>姓名</th>
						<th style = {{textAlign : "center"}}>性别</th>
						<th style = {{textAlign : "center"}}>年龄</th>
						<th style = {{textAlign : "center"}}>操作</th>
					</tr>
				</thead>
				<tbody>
					{this.makeStudentList()}
				</tbody>
			</table>
		);
	}
}