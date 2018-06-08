import React , {Component} from "react";
import ShowTable from "./components/ShowTable";
import InformationModal from "./components/InformationModal"

export default class MainPage extends Component
{
	constructor()
	{
		super();
		this.state = {
			studentList : [
					{id : 20 , name : "张三" , age : 23 , gender : "m"} ,
					{id : 60 , name : "李四" , age : 63 , gender : "f"} ,
					{id : 34 , name : "王五" , age : 34 , gender : "m"}
				] ,
			studentSelected : undefined ,
			isModalShowFlag : false
		};
		this.deleteStudent = this.deleteStudent.bind(this);
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.saveStudent = this.saveStudent.bind(this);
		this.editStudent = this.editStudent.bind(this);
		this.addStudent = this.addStudent.bind(this);
		this.isIdExist = this.isIdExist.bind(this);
	}

	showModal()
	{
		this.setState({isModalShowFlag : true})
	}

	isIdExist(id)
	{
		for(let i = 0 ; i < this.state.studentList.length ; ++i)
		{
			if(id.toString() === this.state.studentList[i].id.toString())
			{
				return true;
			}
		}
		return false;
	}

	editStudent(student)
	{
		this.setState({
			studentSelected : student
		});
		this.showModal();
	}

	addStudent()
	{
		this.showModal();
	}

	saveStudent(target , obj)
	{
		if(target)
		{
			this.setState((preState) =>{
				for(let i = 0 ; i < preState.studentList.length ; ++i)
				{
					if(target.id.toString() === preState.studentList[i].id.toString())
					{
						preState.studentList[i] = obj;
						break;
					}
				}
				return {
					studentList : preState.studentList
				}
			})
		}
		else
		{
			this.setState((preState) =>{
				preState.studentList.push(obj);
				return {
					studentList : preState.studentList
				}
			});
		}
		this.closeModal();
	}

	closeModal()
	{
		this.setState({
			isModalShowFlag : false ,
			studentSelected : undefined
		})
	}

	deleteStudent(student)
	{
		this.setState((preState) =>({
			studentList : preState.studentList.filter(item =>{return item.id !== student.id})
		}))
	}

	render()
	{
		return(
			<div className = "container">
				<div className = "form-horizontal">
					<div className = "form-group">
						<span style = {{fontSize : "40px"}}><b>学生信息管理表</b></span>
						<button className = "btn btn-success btn-lg" style = {{float : "right" , marginTop : "13px"}} onClick = {this.addStudent}><i className = "fa fa-plus"></i>新增学生</button>
					</div>
					<div className = "form-group">
						<ShowTable students = {this.state.studentList} editFunc = {this.editStudent} deleteFunc = {this.deleteStudent} />
					</div>
				</div>
				{this.state.isModalShowFlag ? <InformationModal student = {this.state.studentSelected ? this.state.studentSelected : undefined} isIdExist = {this.isIdExist} saveStudent = {this.saveStudent} closeModal = {this.closeModal}/> : undefined}
			</div>
		);
	}
}