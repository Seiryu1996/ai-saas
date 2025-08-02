import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageGenerator= () => {
    return (
        <div>
            <div>
                <form action="">
                    <div>
                        <Label htmlFor="keyword">キーワード</Label>
                        <Input
                            id="keyword"
                            name="keyword"
                            placeholder="作成したい画像のキーワードを入力(例：海、山、都会、自然)"
                        />
                    </div>
                    {/** submit button */}
                    <Button>画像生成</Button>
                </form>
            </div>
            {/** image preview */}
        </div>
    );
}

export default ImageGenerator;