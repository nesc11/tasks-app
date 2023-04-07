export const FilterButton = ({ filter, setFilter, value }) => {

    const opacity = filter === value ? "opacity-100" : "opacity-50"

    const handleFilter = () => {
        setFilter(value)
    }

    return (
        <button onClick={handleFilter} className={`bg-blue-400 py-2 px-4 rounded-md ${opacity}`}>{value}</button>
    )
}