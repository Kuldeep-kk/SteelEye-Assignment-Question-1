const Search = ({ searchText, onChange }) => {
  return <input type="text" value={searchText} onChange={onChange} placeholder="Enter Order ID" style={{color:"grey", textAlign:"center",height:"20px",borderRadius:"15px"}} />
}

export default Search
