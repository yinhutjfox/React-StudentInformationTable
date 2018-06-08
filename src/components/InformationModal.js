import React , { Component } from "react"

export default class InformationModal extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			informationCheck : [this.props.student ? true : false , this.props.student ? true :false , this.props.student ? true : false , this.props.student ? true : false] ,
			id : this.props.student ? this.props.student.id : "" ,
			name : this.props.student ? this.props.student.name : "" ,
			gender : this.props.student ? this.props.student.gender : "" ,
			age : this.props.student ? this.props.student.age : ""
		};
		this.stopModalClickPropagate = this.stopModalClickPropagate.bind(this);
		this.idInput = this.idInput.bind(this);
		this.nameInput = this.nameInput.bind(this);
		this.genderInput = this.genderInput.bind(this);
		this.ageInput = this.ageInput.bind(this);
		this.setSaveBtnState = this.setSaveBtnState.bind(this);
		this.saveBtnClick = this.saveBtnClick.bind(this);
	}

	componentDidMount()
	{
		this.setSaveBtnState(this.state.informationCheck);
	}

	stopModalClickPropagate(event)
	{
		event.stopPropagation();
	}

	idInput(event)
	{
		let temp = event.currentTarget.value.replace(/[^0-9]/g , "");
		event.currentTarget.value = temp;
		if("" === temp)
		{
			this.setState((preState) =>{
				preState.informationCheck[0] = false;
				this.idHint.className = "hintHidden";
				this.setSaveBtnState(preState.informationCheck);
				return {
					informationCheck : preState.informationCheck
				}
			});
		}
		else
		{
			if(this.props.isIdExist(temp))
			{
				if(this.props.student)
				{
					if(temp.toString() === this.props.student.id.toString())
					{
						this.setState((preState) =>{
							preState.informationCheck[0] = true;
							this.idHint.className = "hintHidden";
							this.setSaveBtnState(preState.informationCheck);
							return {
								informationCheck : preState.informationCheck
							}
						});
					}
					else
					{
						this.setState((preState) =>{
							preState.informationCheck[0] = false;
							this.idHint.className = "hintDisplay";
							this.setSaveBtnState(preState.informationCheck);
							return {
								informationCheck : preState.informationCheck
							}
						});
					}
				}
				else
				{
					this.setState((preState) =>{
						preState.informationCheck[0] = false;
						this.idHint.className = "hintDisplay";
						this.setSaveBtnState(preState.informationCheck);
						return {
							informationCheck : preState.informationCheck
						}
					});
				}
			}
			else
			{
				this.setState((preState) =>{
					preState.informationCheck[0] = true;
					this.idHint.className = "hintHidden";
					this.setSaveBtnState(preState.informationCheck);
					return {
						informationCheck : preState.informationCheck
					}
				});
			}

		}
		this.setState({
			id : temp
		});
	}

	nameInput(event)
	{
		let temp = event.currentTarget.value.replace(/[ ]/g , "");
		event.currentTarget.value = temp;
		if("" === temp)
		{
			this.setState((preState) =>{
				preState.informationCheck[1] = false;
				this.setSaveBtnState(preState.informationCheck);
				return {
					informationCheck : preState.informationCheck
				}
			});
		}
		else
		{
			this.setState((preState) =>{
				preState.informationCheck[1] = true;
				this.setSaveBtnState(preState.informationCheck);
				return {
					informationCheck : preState.informationCheck
				}
			});
		}
		this.setState({
			name : temp
		});
	}

	genderInput(event)
	{
		let temp = event.currentTarget.value;
		if("" === temp)
		{
			this.setState((preState) =>{
				preState.informationCheck[2] = false;
				this.setSaveBtnState(preState.informationCheck);
				return {
					informationCheck : preState.informationCheck
				}
			});
		}
		else
		{
			this.setState((preState) =>{
				preState.informationCheck[2] = true;
				this.setSaveBtnState(preState.informationCheck);
				return {
					informationCheck : preState.informationCheck
				}
			});
		}
		this.setState({
			gender : temp
		});
	}

	ageInput(event)
	{
		let temp = event.currentTarget.value.replace(/[^0-9]/g , "");
		if("" !== temp)
		{
			temp = parseInt(temp , 10).toString();
		}
		event.currentTarget.value = temp;
		if("" === temp)
		{
			this.setState((preState) =>{
				preState.informationCheck[3] = false;
				this.ageHint.className = "hintHidden";
				this.setSaveBtnState(preState.informationCheck);
				return {
					informationCheck : preState.informationCheck
				}
			});
		}
		else
		{
			if(120 < parseInt(temp , 10))
			{
				this.setState((preState) =>{
					preState.informationCheck[3] = true;
					this.ageHint.className = "hintDisplay";
					this.setSaveBtnState(preState.informationCheck);
					return {
						informationCheck : preState.informationCheck
					}
				});
			}
			else
			{
				this.setState((preState) =>{
					preState.informationCheck[3] = true;
					this.ageHint.className = "hintHidden";
					this.setSaveBtnState(preState.informationCheck);
					return {
						informationCheck : preState.informationCheck
					}
				});
			}
		}
		this.setState({
			age : temp
		});
	}

	saveBtnClick()
	{
		this.props.saveStudent(this.props.student , {
			id : this.state.id ,
			name : this.state.name ,
			gender : this.state.gender ,
			age : this.state.age
		});
	}

	setSaveBtnState(informationCheck)
	{
		for(let i = 0 ; i < informationCheck.length ; ++i)
		{
			if(!informationCheck[i])
			{
				this.saveBtn.disabled = true;
				return;
			}
		}
		this.saveBtn.disabled = false;
	}

	render()
	{
		return (
			<div id = "informationModal" onClick = {this.props.closeModal}>
				<div className = "modalDialog" onClick = {this.stopModalClickPropagate}>
					<div className = "header">
						<span style = {{fontSize : "20px"}}>{this.props.student ? "修改学生" : "新增学生"}</span>
					</div>
					<div className = "body">
						<div style = {{marginLeft : "20px" , marginRight : "20px"}}>
							<div className = "form-group">
								学 号 ：
								<div className = "my-input-group">
									<input className = "form-control" defaultValue = {this.state.id} onInput = {this.idInput} />
									<span className = "hintHidden" ref = {e => this.idHint = e} >* 学号已存在</span>
								</div>
							</div>
							<div className = "form-group">
								姓 名 ：
								<input className = "form-control" defaultValue = {this.state.name} onInput = {this.nameInput} />
							</div>
							<div className = "form-group">
								性 别 ：
								<label>
									男 ：
									<input type = "radio" name = "gender"
									       value = "m"
									       onChange = {this.genderInput}
									       defaultChecked = {"m" === this.state.gender ? true : false} />
								</label>
								<label>
									女 ：
									<input type = "radio" name = "gender"
									       value = "f"
									       onChange = {this.genderInput}
									       defaultChecked = {"f" === this.state.gender ? true : false} />
								</label>
							</div>
							<div className = "form-group">
								年 龄 ：
								<div className = "my-input-group">
									<input className = "form-control" defaultValue = {this.state.age} onInput = {this.ageInput} />
									<span className = "hintHidden" ref = {e =>{this.ageHint = e}} >* 你确定你能活那么长?</span>
								</div>
							</div>
						</div>
					</div>
					<div className = "footer">
						<button className = "btn btn-danger btn-lg" onClick = {this.props.closeModal}>取 消</button>
						<button className = "btn btn-success btn-lg" ref = {e =>this.saveBtn = e} onClick = {this.saveBtnClick} >保 存</button>
					</div>
				</div>
			</div>
		);
	}
}