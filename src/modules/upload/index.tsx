import './modal.css';
import React from "react";
import MicrosoftIcon from "../../assets/icons/microsoft";
import papa from "papaparse";
type UploadModalProps = {
    closeModal: () => void
}
export default function UploadModal(props: UploadModalProps) {
    const hiddenFileInput = React.useRef(null);
    const progressRef = React.useRef(null);
    const [dropAreaVisible, setDropAreaVisible] = React.useState(true);
    const handleClick = () => {
        if(!dropAreaVisible) return;
        // @ts-ignore
        hiddenFileInput.current.click();
    };
        // @ts-ignore
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        if(fileUploaded === undefined) return;
        setDropAreaVisible(false);
        sleep(600).then(() => {
            papa.parse(fileUploaded, {
                delimiter: undefined,	// auto-detect
                newline: undefined,	// auto-detect
                quoteChar: '"',
                escapeChar: '"',
                header: true,
                transformHeader: undefined,
                dynamicTyping: false,
                preview: 0,
                comments: false,
                step: undefined,
                skipEmptyLines: false,
                fastMode: undefined,
                beforeFirstChunk: undefined,
                transform: undefined,
                delimitersToGuess: [',', '\t', '|', ';',],
                complete: async (result: { data: any; }) => {
                    // console.log(result.data);
                    let delay = 100;
                    if(result.data.length > 10) {
                        delay = 75;
                    }else if(result.data.length > 50) {
                        delay = 25;
                    }
                    const employeesToAdd = [];
                    // for each row in the csv file
                    for (let i = 0; i < result.data.length; i++) {
                        ProgressHandler({loaded: i, total: result.data.length - 1});
                        // as we are processing the file locally, the progress is rather instant, so we add a delay to simulate a real upload
                        await sleep(delay);
                        console.log("i:",result.data[i])
                        // create a new array with the results.data[i] and generate a random 2 letter+4 digit ID, and add it to the array

                        // if name is '', and other fields undefined, skip
                        if(result.data[i].name === '') {
                            continue;
                        }
                        employeesToAdd.push({
                            id: Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 6),
                            ...result.data[i]
                        });
                    }

                    // push employeesToAdd to existing local storage employees-data
                    let existingEmployees: string | null | any[] = localStorage.getItem("employees-data");
                    if(existingEmployees === null) {
                        existingEmployees = [];
                    }
                    else {
                        existingEmployees = JSON.parse(existingEmployees);
                    }
                    // for each existing employee, check if the employee already exists in the employeesToAdd array using email, if it does, update the existing employee with the new data, else add the new employee
                    for (let i = 0; i < existingEmployees!.length; i++) {
                        for (let j = 0; j < employeesToAdd.length; j++) {
                            if(existingEmployees![i].email === employeesToAdd[j].email) {
                                // @ts-ignore
                                existingEmployees[i] = employeesToAdd[j];
                                employeesToAdd.splice(j, 1);
                            }
                        }
                    }

                    // @ts-ignore
                    existingEmployees!.push(...employeesToAdd);
                    localStorage.setItem("employees-data", JSON.stringify(existingEmployees));

                    console.log(employeesToAdd);
                    localStorage.setItem("upload-success", "true");
                    uploadSuccess()
                }
            });
        });
    };
    const ProgressHandler = (e: {loaded:number,total:number}) => {
        let percent = (e.loaded / e.total) * 100;
        // @ts-ignore
        progressRef.current.value = Math.round(percent);
    };
    // sleep function
    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    const uploadSuccess = () => {
            console.log("upload success, reloading")
            window.location.reload()

    };
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                  <span className={"modal-title"}>
                      Upload File
                      <span className="close" onClick={props.closeModal}>&times;</span>
                  </span>

                    <form>
                        <div className={"file-parent"}>
                            <div id={"drop-area"} className={dropAreaVisible?"fadeIn":"fadeOut"}>
                                <div className={"file"}>
                                    {/*file input accept csv and xlsx*/}
                                    <input type="file" name="file" className={"file-input"} onChange={handleChange}
                                           accept={".csv"} ref={hiddenFileInput}/>
                                </div>
                                <div className={"custom-input"}>
                                    <span onClick={handleClick}>

                                    <img src={"images/files.png"} alt={"upload"}/><br/>
                                        Drag and drop your files here <br/>
                                        or <u>click to upload</u>
                                    </span>
                                </div>
                            </div>

                            <div id={"upload-status-area"} className={["upload-status-area", !dropAreaVisible ? "fadeIn" : "fadeOut"].join(' ')}>
                                <progress ref={progressRef} value="0" max="100"/>
                                <span>Please wait while we upload your file...</span>
                            </div>
                        </div>
                        {/*<button type="submit">Upload</button>*/}
                    </form>
                    <div className={"file-info"}>
                        <span>
                            Supported formats: CSV
                        </span>
                        <span>
                            Maximum file size: 10MB
                        </span>
                    </div>
                    <div className={"example-file"}>
                        <MicrosoftIcon/>
                        <div className={"example-description"}>
                            <span className={"example-title"}>Table Example</span>
                            <span>
                                You can download the attached example and use them as a starting point for your own file.
                            </span>
                        </div>

                        <div className={"banner-actions modal-buttons"}>
                            <a href={"/example/test_csv.csv"} className={"button"}>Download CSV</a>
                        </div>
                    </div>
                    <div className={"banner-actions modal-buttons"}>
                        <button onClick={props.closeModal} className={"button"}>Cancel</button>
                        <button className={"button main"}>Continue</button>

                    </div>
                </div>
            </div>
        </>
    )
}