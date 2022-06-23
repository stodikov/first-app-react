import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3},
            ],

            maxID: 4,
            term: '',
            filterType: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addEmploye = (name, salary) => {
        const newEmploye = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: this.state.maxID
        }
        this.setState(({data, maxID}) => {
            return {
                data: [...data, newEmploye],
                maxID: maxID + 1
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmployees = (items, term) => {
        if (term.length === 0) return items;
        return items.filter(item => item.name.indexOf(term) > -1);
    }

    filterEmployees = (items, filterType) => {
        switch (filterType) {
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onUpdateFilterType = (filterType) => {
        this.setState({filterType})
    }

    render() {
        const {data, term, filterType} = this.state;
        const employees = this.state.data.length;
        const increase = this.state.data.filter(item => item.increase).length;
        const filterEmployees = this.filterEmployees(data, filterType);
        const visibleData = this.searchEmployees(filterEmployees, term);

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increase={increase}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filterType={filterType}
                        onUpdateFilterType={this.onUpdateFilterType}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onAddEmploye={this.addEmploye}/>
            </div>
        );
    }
}

export default App;