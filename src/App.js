import React,{useEffect,useState} from "react";
const App=()=>{
  const [data,setData]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState(null);
  const itemsPerPage=10;
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError('failed to fetch data');
        setIsLoading(false);
        alert("Failed to fetch data.Please try again later.");
      }
    };
    fetchData();
  },[]);
  const handlePrevious=()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  };
  const handleNext=()=>{
    const totalPages=Math.ceil(data.length/itemsPerPage);
    if(currentPage<totalPages){
      setCurrentPage(currentPage+1);
    }
  };
  const getPaginationData=()=>{
    const startIndex=(currentPage-1)*itemsPerPage;
    const endIndex=startIndex+itemsPerPage;
    return data.slice(startIndex,endIndex);
  };
  if(isLoading){
    return <div>Loading...</div>;
  }
  if(error){
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Employee Data</h1>
      <table border="1" style={{borderCollapse:"collapse",width:"100%"}}>
        <thead style={{textAlign:"left",backgroundColor:"green"}}>
          <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {getPaginationData().map((employee)=>(
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:"10px",textAlign:"center"}}>
        <button
         onClick={handlePrevious}
         disabled={currentPage===1}
         style={{marginRight:"10px",backgroundColor:"green"}}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage===Math.ceil(data.length/itemsPerPage)}
          style={{marginLeft:"10px",backgroundColor:"green"}}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default App;
