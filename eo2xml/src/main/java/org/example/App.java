package org.example;

import com.jcabi.xml.XMLDocument;
import com.jcabi.xml.XML;
import com.yegor256.xsline.Xsline;
import org.eolang.parser.ParsingTrain;
import java.io.ByteArrayOutputStream;
import org.eolang.parser.Syntax;
import org.cactoos.io.InputOf;
import org.cactoos.io.OutputTo;

import java.io.IOException;
import java.nio.file.Paths;


public class App {
    public static void main(String[] args) throws IOException {
        if (args.length != 1) {
            System.err.println("Specify the path");
            System.exit(1);
        }

        String path = args[0];

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        new Syntax(
                "foo",
                new InputOf(Paths.get(path)),
                new OutputTo(baos)
        ).parse();

        XML xmir = new XMLDocument(baos.toByteArray());
        XML after = new Xsline(new ParsingTrain()).pass(xmir);

        System.out.println(after.toString());
//        System.out.println("Hello!");
    }
}
