import Card from "./Components/Card";

function Mid(){
    return(
        <div className="grid grid-cols-1 tb:grid-cols-3 place-items-center gap-y-10">
             <Card title={"Build"} sub1="Get access to documentation," sub2="And Clone The Repo"/>
             <Card title="Contribute" sub1="Report issues, request features," sub2="or improve the codebase on GitHub."/>
             <Card title="Use PolyDash" sub1="Explore real-time crypto price updates"sub2="insights on PolyDash."/>

        </div>
    )
}
export default Mid;